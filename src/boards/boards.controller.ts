import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

//컨트롤러는 들어오는 요청 request을 처리하고 응답 response을 클라이언트에 반환할 책임이 있습니다.
@Controller('boards')//데코레이터를 사용하여 기본 컨트롤러를 생성하고 boards를 통해 경로를 설정해준다.
@UseGuards(AuthGuard())//컨트롤러 레벨로 주었기 때문에, 모든 핸들러가 다 영향을 받는다.
export class BoardsController {
  constructor(private boardsService: BoardsService) { }
  
  // @Get()//'/'루트
  @Get()
  getAllBoard(
    @GetUser() user: User//request, body, param등등 요청객체를 받아오는 것이다. 
    //나만의 데코레이터도 만들 수 있다. 심화버전 
  ): Promise<Board[]> {
    return this.boardsService.getAllBoards(user);
  }

  @Post()
  @UsePipes(ValidationPipe)//파이프는 유효성검사와 변환이 있는데 여기서는 유효성을 검사하여 보드를 생성할 떄 검사를 하는 것이다.
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board>{
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number,
  @GetUser()user:User): Promise<void>{
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status:BoardStatus
  ):Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
