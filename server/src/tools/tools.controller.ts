import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { Tool } from 'src/typeorm/entities/Tool';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateToolDto } from 'src/dtos/createToolDto.dto';
import { User } from 'src/typeorm/entities/User';
import { Kiosk } from 'src/typeorm/entities/Kiosk';
import { KiosksService } from 'src/kiosks/kiosks.service';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '../auth/auth.guard';
import { log } from 'console';
import { CategoriesService } from 'src/categories/service/categories.service';
import { UpdateToolDto } from 'src/dtos/updateToolDto.dto';
import { Category } from 'src/typeorm/entities/Category';

@Controller('tools')
export class ToolsController {

    constructor(private toolsService: ToolsService, private usersService: UsersService, private kiosksService: KiosksService, private categoriesService: CategoriesService) {}

    async sendResponse(data: Tool[] | null, resource: string){

        if(await data != undefined){
            return {
                status: 'success',
                code: 200,
                data: data
            }
        }
        else{
            return {
                status: 'error',
                code: 404,
                message: resource +" not found"
            }
        }
    }
    
    @UseGuards(AuthGuard)
    @Post()
    async createTool(@Body() createTool: CreateToolDto): Promise<any> {
        try{
            return this.toolsService.createTool(createTool);
        }
        catch(e){
            return this.sendResponse(null, e.message);
        }
    }

    @Get(':id')
    async getTool(@Param('id') idTool: number): Promise<Tool | any> {
        let tool = await this.toolsService.getTool(idTool);
        if(tool){
            return tool;
        }
        else{
            return this.sendResponse(null, "Tool");
        }
    }   

    @Get()
    async getTools(): Promise<Tool[]> {
        return this.toolsService.getTools();
    }

    @UseGuards(AuthGuard)
    @Get('/owner/:username')
    async getToolByUsername(@Param('username') username: string): Promise<Tool[] | any> {
        try{
            return await this.toolsService.getToolsByOwner(username);
        }
        catch(e){
            return this.sendResponse(null, e.message)
        }
    }

    @Get('/kiosk/:kioskId')
    async getToolsByKiosk(@Param('kioskId') kioskId: number): Promise<Tool[]> {
            return await this.toolsService.getToolsByKiosk(kioskId);
    }

    @Put(':id')
    async updateTool(@Param('id') id: number, @Body() updateTool: UpdateToolDto)/*: Promise<UpdateResult> */{
        const user =  await this.usersService.findUserByUsername(updateTool.userPKUsername);
        const kiosk:Kiosk = await this.kiosksService.getKiosk(updateTool.kioskPKLocationId);
        const category: Category = await this.categoriesService.getCategoryById(updateTool.categoryPKCategoryId);
        const newTool:Tool = new Tool();
        newTool.name = updateTool.name;
        newTool.description = updateTool.description;
        newTool.status = updateTool.status;
        newTool.rental_rate = updateTool.rental_rate;
        newTool.condition = updateTool.condition;
        newTool.category = category;
        newTool.user = user[0];
        newTool.kiosk = kiosk;
        return this.toolsService.editTool(id, newTool);    
    }

    @Put('status/:id')
    async updateToolStatus(@Param('id') id: number, @Body() updateTool: UpdateToolDto)/*: Promise<UpdateResult> */{
        const tool: Tool =  await this.toolsService.getTool(id)
        if(tool) {
            return this.toolsService.editToolStatus(id, updateTool); 
        } 
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteTool(@Param('id') id: number): Promise<DeleteResult> {
        return this.toolsService.deleteTool(id);
    }
}


