import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from './board.entity';
import { CreateBoardDto } from "./dto/create-board.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{
  async createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board>{
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user
    });
    await this.save(board);
    return board;
    }
}
//리포지토리는 엔티티 개체와 함께 작동하며 엔티티 찾기, 삽입, 업데이트, 삭제 등을 처리한다.
//다른건 레파지토리를 사용하지 않는데 왜 크리에이트만 레파지토리를 사용하는 것인가???
//답변: 크리에이트 메소드만 복잡해서