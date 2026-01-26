
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Game } from "./Game";

export enum UserRole {
  Admin = "admin",
  Player = "player",
}

@ObjectType()
@Entity({ name: "User" })
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: "id_user" })
  idUser: number;

  @Field()
  @Column({ length: 50 })
  username: string;

  @Field()
  @Column({ enum: UserRole, default: UserRole.Player })
  role: UserRole;

  @Column({ type: "text", nullable: true })
  hashedPassword: string;

  @Field(() => String)
  @Column({ type: "date", name: "creation_date", default: () => "CURRENT_DATE" })
  creationDate: Date;

  @Field(() => Int)
  @Column({ name: "games_played", default: 0 }) 
  gamesPlayed: number;

  @Field(() => Int)
  @Column({ name: "games_won", default: 0 })
  gamesWon: number;

  @Field(() => Int)
  @Column({ name: "total_score", default: 0 })
  totalScore: number;

  @Field(() => Int)
  @Column({ name: "best_score", default: 0 })
  bestScore: number;

  
  @Field(() => [Game])
  @OneToMany(() => Game, (game) => game.user)
  games: Game[];
}