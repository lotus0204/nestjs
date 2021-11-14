import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @ManyToMany(() => User, user => user.boards,{eager:false})
    user: User
}
//여기서 엔티티를 정의하는 것은 typeorm과 관련이 있어.
//baseEntity를 상속받는 이유는 active pattern을 사용하기 위해서
//active parttern을 사용하면 레파지토리 없이 바로 메서드를 쓸 수 있다. 
//base mapper vs active pattern
//쿼리 빌더는 무엇인가?