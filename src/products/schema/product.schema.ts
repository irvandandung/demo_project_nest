import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class ProductEntity{
	@Prop({required:true})
	name : string;

	@Prop({required:true})
	category : string;

	@Prop({required: true})
	description : string;

	@Prop({required: true})
	price : number;

	@Prop({required: true})
	stock : number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity)



