import { Module } from '@nestjs/common';
// @ts-ignore
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.elastic.env',
    }),

    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
       
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchModule]
})  
export class SearchModule {}
