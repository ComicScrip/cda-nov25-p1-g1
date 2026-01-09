import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Attempt } from "./Attempt";
import { Word } from "./Word";
import { User } from "./User";

@ObjectType()
@Entity({ name: "Game" })
export class Game extends BaseEntity {
    //@Field(() => Int)
    //@PrimaryGeneratedColumn({ name: "id_game" })
    //idGame: number;

    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id_game" })
    idGame: number;

    @Field()
    @Column({ type: "datetime", name: "start_date" })
    startDate: Date;

    @Field()
    @Column({ type: "datetime", name: "end_date" })
    endDate: Date;

    @Field()
    @Column({ length: 50 })
    status: string;

    @Field(() => Int)
    @Column({ name: "max_errors" })
    maxErrors: number;

    @Field(() => Int)
    @Column()
    score: number;

    // ✅ RELATION avec Word
    @Field(() => Word)
    @ManyToOne(() => Word)
    @JoinColumn({ name: "id_word" })
    word: Word;


    @Field(() => [User])
    @OneToMany(() => User, user => user.game)
    users: User[];

    // ✅ RELATION avec Attempt
    @Field(() => [Attempt])
    @OneToMany(() => Attempt, attempt => attempt.game)
    attempts: Attempt[];
}
