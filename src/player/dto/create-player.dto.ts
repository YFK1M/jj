export class CreatePlayerDto {
  readonly name: string;
  readonly surname: string;
  readonly age: number;
  readonly position: string;
  readonly match_count: number;
  readonly goal_count: number;
}
