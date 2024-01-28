import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Kiosk } from 'src/typeorm/entities/Kiosk';
import { Repository } from 'typeorm';
import { CoordinatesHandler } from 'src/geoHandling/coordinates';
import { CreateKioskDto } from 'src/dtos/createKiosk.dto';

@Injectable()
export class KiosksService {
    
    private coordinatesHandler: CoordinatesHandler = new CoordinatesHandler();
    constructor(@InjectRepository(Kiosk) private kioskRepo: Repository<Kiosk>){}

    async createKiosk(kiosk: CreateKioskDto){
        this.kioskRepo.save(kiosk);
        return {
            "status": "OK",
            "code": 200,
            "message": ["Kiosk added successfully"]
        }
    }

    async getKiosk(id: number): Promise<Kiosk> {
        const kiosk = await this.kioskRepo.findOne({where: {PK_location_id: id}});
        if(kiosk){
            return kiosk
        }
        else{
            throw new Error("Kiosk");
        }
    }

    async getKiosks(): Promise<Kiosk[]> {
        return this.kioskRepo.find();
    }

    async getKiosksByDistance(distance: number, address: string): Promise<Kiosk[]> {
        const temp = await this.kioskRepo.find();
        const currentLocation = await this.coordinatesHandler.getCoordinates(address);
        let result: Kiosk[] = [];
        for (let i = 0; i < temp.length; i++) {
            const element = temp[i];
            const elementCoords = await this.coordinatesHandler.getCoordinates(element.address);
            const distanceBetween = await this.coordinatesHandler.getDistance(currentLocation.lat, currentLocation.lon, elementCoords.lat, elementCoords.lon);
            log(distanceBetween);
            if (distance > distanceBetween) {
                result.push(element);
            }
        }

        return result;
        //return this.kioskRepo.query(`SELECT * FROM kiosk WHERE distance <= ${distance}`);
    }

    async getClosestKiosk(address: string): Promise<Kiosk> {
        const temp = await this.kioskRepo.find();
        const currentLocation = await this.coordinatesHandler.getCoordinates(address);
        
        if (temp.length === 0) {
            throw new Error('No kiosks found');
        }

        let result: Kiosk = temp[0];
        const firstKioskCoords = await this.coordinatesHandler.getCoordinates(result.address);
        let closestDistance = await this.coordinatesHandler.getDistance(currentLocation.lat, currentLocation.lon, firstKioskCoords.lat, firstKioskCoords.lon);

        for (let i = 1; i < temp.length; i++) {
            const element = temp[i];
            const elementCoords = await this.coordinatesHandler.getCoordinates(element.address);
            const distanceBetween = await this.coordinatesHandler.getDistance(currentLocation.lat, currentLocation.lon, elementCoords.lat, elementCoords.lon);
            if(distanceBetween < closestDistance){
                closestDistance = distanceBetween;
                result = element;
            }
        }

        return result;
    }
}
