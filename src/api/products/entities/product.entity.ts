import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;


  @Column({nullable: true})
  price: number;
}