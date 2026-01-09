import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@ObjectType()
@Entity({ name: "Attempt" })
export class Attempt extends BaseEntity {
    //@Field(() => Int)
    //@PrimaryGeneratedColumn({ name: "id_attempt" })
    //idAttempt: number;
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id_attempt" })
    idAttempt: number;

    @Field()
    @Column({ length: 1 })
    letters: string;

    @Field()
    @Column({ type: "boolean", default: false })
    isCorrect: boolean;

    @Field()
    @Column({ type: "datetime", name: "attempt_date" })
    attemptDate: Date;

    @ManyToOne(() => Game, game => game.attempts, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "game_id" })
    game: Game;
}

