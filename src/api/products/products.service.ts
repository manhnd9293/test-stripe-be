import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    getAll() {
        return 'All'
    }
}
