import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Attempt } from "./Attempt";
import { Word } from "./Word";
import { User } from "./User";

@ObjectType()
@Entity({ name: "Game" })
export class Game extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id_game" })
    idGame: number;

    @Field()
    @Column({ type: "timestamp", name: "start_date" })
    startDate: Date;

    @Field()
    @Column({ type: "timestamp", name: "end_date" })
    endDate: Date;

    @Field()
    @Column({ length: 50 })
    status: string;

    @Field(() => Int)
    @Column({ name: "errors_count", default: 0 })
    errorsCount: number;

    @Field()
    @Column({ name: "used_hint", default: false })
    usedHint: boolean;

    @Field(() => Int)
    @Column()
    score: number;

    @Field(() => Word)
    @ManyToOne(() => Word)
    @JoinColumn({ name: "id_word" })
    word: Word;

    @Field(() => Int)
    @Column({ name: "id_user" })
    idUser: number;

    
    @Column({ name: "id_word" })
    idWord: number;

    @Field(() => [Attempt], { nullable: true })
    @OneToMany(() => Attempt, (attempt) => attempt.game) 
    attempts: Attempt[];
}