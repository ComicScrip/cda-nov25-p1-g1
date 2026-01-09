import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Game } from "./Game";

@ObjectType()
@Entity({ name: "User" })
export class User extends BaseEntity {
  //@Field(() => Int)
  //@PrimaryGeneratedColumn({ name: "id_user" })
  //idUser: number;

  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: "id_user" })
  idUser: number;

  @Field()
  @Column({ length: 50 })
  username: string;

  @Field()
  @Column({ length: 50 })
  role: string;

  @Column({ type: "text", nullable: true })
  password: string | null;

  @Column({
    type: "date",
    name: "creation_date",
    default: () => "CURRENT_DATE",
  })
  creationDate: Date;

  @Field(() => Int)
  @Column({ name: "games_played" })
  gamesPlayed: number;

  @Field(() => Int)
  @Column({ name: "games_won" })
  gamesWon: number;

  @Field(() => Int)
  @Column({ name: "total_score" })
  totalScore: number;

  @Field(() => Int)
  @Column({ name: "best_score" })
  bestScore: number;

  @Field(() => Game)
  @ManyToOne(() => Game)
  @JoinColumn({ name: "id_game" })
  game: Game;
}
