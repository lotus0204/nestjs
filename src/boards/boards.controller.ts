import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards')//boards라는 경로야
export class BoardsController {
  constructor(private boardsService: BoardsService) { }
  
  @Get()//'/'루트야
  //타입을 정의해 주는 것은 좋아. 보는 사람도 좋고 에러의 부분에서도 쉽게 확인할 수 있어
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string
  ): Board {
    //board하나를 리턴하는 것이기 때문에 []안쓰는거야
    return this.boardsService.createBoard(title, description);
  }
}
