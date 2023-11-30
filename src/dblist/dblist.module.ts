import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config/dist';

@Module({

    imports : [

        TypeOrmModule.forRootAsync({

            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : (c:ConfigService) => ({

                type : 'postgres',
                port : c.get('POSTGRES_PORT'),
                host : c.get('POSTGRES_HOST'),
                username : c.get('POSTGRES_USER'),
                password : c.get('POSTGRES_PASSWORD'),
                database:  c.get('POSTGRES_DB'),
                entities : [ __dirname + "/../**/*.entity{.ts,.js}"],
                autoLoadEntities : true,
                synchronize : true,



            })




        })



    ]






})
export class DblistModule {}
