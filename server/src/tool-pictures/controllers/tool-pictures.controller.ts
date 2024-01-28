import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ToolPicturesService } from '../services/tool-pictures.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ToolPicture } from 'src/typeorm/entities/ToolPicture';
import { join } from 'path';
import { Response } from 'express';

@Controller('tool-pictures')
export class ToolPicturesController {
    constructor(private toolPicturesService: ToolPicturesService) {}

    @UseGuards()
    @Post('upload/:toolId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('toolId') toolId: number): Promise<string> {
        return await this.toolPicturesService.uploadFile( file, toolId );
    }

    @Post('download')
    getImage(@Body('imageUrl')imageURL: string, @Res() res: Response): void {
        const imagePath = join(imageURL);
        
        res.sendFile(imagePath, { root: 'images' });
    }

    @Get('tool/:toolId')
    async getFilesByToolId(@Param('toolId')toolId: number): Promise<ToolPicture[]> {
        return await this.toolPicturesService.getFilesByToolId(toolId);
    }

    @UseGuards()
    @Delete('tool/:toolId')
    async deleteFilesByToolId(@Param('toolId') toolId: number): Promise<any> {
        const pictures: ToolPicture[] = await this.toolPicturesService.getFilesByToolId(toolId);
        for(var i = 0; i < pictures.length; i++) { 
            await this.toolPicturesService.deleteById(pictures[i].id);
            await this.toolPicturesService.deleteFile("./images/"+pictures[i].imageUrl);
        }
        
    }

    @UseGuards()
    @Delete(':fileId')
    async deleteFileById(@Param('fileId') fileId: number): Promise<any> {
        const picture: ToolPicture = await this.toolPicturesService.getFileById(fileId);
        await this.toolPicturesService.deleteById(fileId);
        await this.toolPicturesService.deleteFile("./images/"+picture.imageUrl);
        
    }

    @UseGuards()
    @Delete('upload/:filePath')
    async deleteFile(@Param('filePath') filePath: string, @Body('toolId') toolId: number): Promise<void> {
        await this.toolPicturesService.deleteFile(filePath);
    }
}
