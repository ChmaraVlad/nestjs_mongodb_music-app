import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log('errror in main file');
  }
};

start();
