import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "User_" })
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: "id_user" })
  idUser: number;

  @Field()
  @Column({ length: 50 })
  username: string;

  @Field()
  @Column({ length: 50 })
  role: string;

  @Column({ length: 50 })
  password: string;

  @Field()
  @Column({ type: "date", name: "creation_date" })
  creationDate: Date;

  @Field()
  @Column({ length: 50, name: "games_played" })
  gamesPlayed: string;

  @Field()
  @Column({ length: 50, name: "games_won" })
  gamesWon: string;

  @Field()
  @Column({ length: 50, name: "total_score" })
  totalScore: string;

  @Field()
  @Column({ length: 50, name: "best_score" })
  bestScore: string;
}
