import { Column, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ProductPriceEntity } from '../../payments/entities/product-price.entity';

@Entity('products')
export class ProductEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;


  @Column({nullable: true})
  price: number;

  @OneToMany(()=>ProductPriceEntity, p => p.product)
  prices: ProductPriceEntity[];
}