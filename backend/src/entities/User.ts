import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, } from "typeorm";
import { Game } from "./Game";

export enum YouAre {
  GUEST = "guest",
  PLAYER = "player",
  ADMIN = "admin",
}

registerEnumType(YouAre, {
  name: "YouAre",
  description: "Everything need to be defined here that's the law",
});



@ObjectType()
@Entity({ name: "User" })
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: "id_user" })
  idUser: number;

  @Field()
  @Column({ length: 50 })
  username: string;

  @Field(() => YouAre)
  @Column({ type: "simple-enum", enum: YouAre })
  role: YouAre;

  @Column({ length: 50, nullable: true })
  password: string | null;

  @Field()
  @Column({ type: "date", name: "creation_date" })
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

  @BeforeInsert()
  @BeforeUpdate()
  private enforcePasswordforPlayersAndAdmins() {
    if (this.role === YouAre.GUEST) {
      this.password = null;

    } else {
      if (!this.password || this.password.trim().length === 0) {
        throw new Error("Password is required for players and admins");
      }///Blablabla need to control password strength etc ....
    }
  }
}
