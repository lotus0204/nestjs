import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [//다른 곳에서도 보드레파지토리를 쓸 수 있도록... 그럼 익스포트 아닌가? 잘 이해안됨
    //이것들을 임포트 해와서 여기서 쓴다는 이야기임!!!
    TypeOrmModule.forFeature([BoardRepository]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
