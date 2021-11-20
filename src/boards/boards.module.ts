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
  providers: [BoardsService]//프로바이더의 주요 아이디어는 종속성을 주입한다는 것이다. 
  // 객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 "연결"하는 기능은 대부분 Nest 런타임 시스템에 위임될 수 있습니다.
//더 복잡한 작업을 컨트롤러가 프로바이더(예를들어 서비스)에게 위임한다. 
})
export class BoardsModule { }
//모듈은 기본적으로 프로바이더를 캡슐화합니다. 
// 즉, 현재 모듈에 직접 포함되거나 가져온(import) 모듈에서 내보내지(export) 않은 프로바이더를 삽입할 수 없습니다.
// 따라서 모듈에서 내보낸 프로바이더를 모듈의 공용 인터페이스 또는 API로 간주할 수 있습니다.


