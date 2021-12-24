import { ValidationPipe } from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {AppModule} from "./app.module";

async function start(){
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Nest JS')
        .setDescription('Documentation for REST API')
        .setVersion('1.0.0')
        .addTag('DanSW')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    // app.useGlobalGuards
    app.useGlobalPipes(new ValidationPipe());
    // await app.init();
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();