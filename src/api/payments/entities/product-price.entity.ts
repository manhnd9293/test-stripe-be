import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('product_prices')
export class ProductPriceEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'product_id'})
  productId: string;

  @Column({name: 'active'})
  active: boolean;

  @Column({ name: 'stripe_price_id', nullable: true })
  stripePriceId: string;

  @ManyToOne(() => ProductEntity, p => p.prices)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id"
  })
  product: ProductEntity;
}