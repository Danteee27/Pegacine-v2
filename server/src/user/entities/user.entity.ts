import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ProfileEntity } from './profile.entity';

export interface UserEntity {
  checkPassword(attempt: string): boolean;
}

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, name: 'username', nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: 1 })
  role: number;

  @Column({ name: 'is_promoted', default: false, nullable: false })
  isPromoted: boolean;

  @Column({ name: 'promoted_expired_at', nullable: true })
  promotedExpiredAt: Date;

  @Column({ name: 'is_verified', default: false, nullable: false })
  isVerified: boolean;

  @Column({ name: 'is_user_active', default: true, nullable: false })
  isUserActive: boolean;

  @Column({ name: 'is_deleted', default: false, nullable: false })
  isDeleted: boolean;

  @Column({ name: 'logged_time', type: 'bigint', default: 0, nullable: false })
  loggedTime: number;

  @OneToMany((type) => ProfileEntity, (profile) => profile.user)
  profiles: ProfileEntity[];

  private tempPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password != this.tempPassword) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  }
}

UserEntity.prototype.checkPassword = function (attempt) {
  return bcrypt.compare(attempt, this.password);
};
