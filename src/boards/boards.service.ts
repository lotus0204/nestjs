import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  //보드리파지토리를 가져와서 쓸수 잇게, 종속성 주입, 프라이빗, 컨스트럭터, 프로프티 등등 
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ){}
  //각각의 것들은 메소드라고 부른다.
  async getAllBoards(user): Promise<Board[]> {
    return await this.boardRepository.find({ where: { userId: user.id } });
  }

  createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board>{
    return this.boardRepository.createBoard(createBoardDto, user);
    }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC
  //   }
  //   this.boards.push(board);
  //   return board;
  // }
  async getBoardById(id: number): Promise<Board>{
    const found = await this.boardRepository.findOne(id);
    if (!found) throw new NotFoundException(`Can't find board with ${id}`);
    return found;
  }
  async deleteBoard(id: number, user:User): Promise<void>{
    const result = await this.boardRepository.delete({id,  user });
    if (result.affected === 0) throw new NotFoundException(`Can't find board with ${id}`);
  }
  
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board{
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
