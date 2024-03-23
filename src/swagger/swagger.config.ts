import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('BraveIT')
  .setDescription('The BraveIT API description')
  .setVersion('1.0')
  .addTag('BraveIT')
  .build();