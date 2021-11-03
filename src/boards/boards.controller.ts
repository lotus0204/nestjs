import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';

@Controller('boards')//boards라는 경로야
export class BoardsController {
  constructor(private boardsService: BoardsService) { }
  
  // @Get()//'/'루트야
  // //타입을 정의해 주는 것은 좋아. 보는 사람도 좋고 에러의 부분에서도 쉽게 확인할 수 있어
  // //핸들러라고 불러 
  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board>{
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void>{
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status:BoardStatus
  ):Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
  // @Get('/:id')
  // getBoardById(
  //   @Param('id') id: string
  // ): Board {
  //   const found = this.boardsService.getBoardById(id);
  //   if (!found) throw new NotFoundException();
  //   return found;

  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void{
  //   this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status') status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id,status)
  // }
    
}