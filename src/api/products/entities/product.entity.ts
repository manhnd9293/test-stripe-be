import { Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  name: string;
}