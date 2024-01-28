import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Tool } from './Tool';
import { User } from './User';
import { PaymentMethod } from './PaymentMethod';

@Entity('user-tools')
export class UserTool {

  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  PK_user_tool_id: number;

  @PrimaryColumn()
  PK_username: string;

  @PrimaryColumn()
  PK_tool_id: number;

  @ManyToOne(() => User, user => user.PK_username )
  @JoinColumn({name: 'PK_username'})
  user: User;

  @ManyToOne(() => Tool, tool => tool.PK_tool_id, { onDelete: 'CASCADE', onUpdate: 'CASCADE'}) 
  @JoinColumn({name: 'PK_tool_id'}) 
  tool: Tool;

  @Column()
  price: number;

  @Column({type: 'boolean'})
  paid: boolean;

  @Column()
  code: string;

  @Column({type: "date"})
  start_date: Date;

  @Column({type: "date"})
  end_date: Date;

  @Column({ nullable: true, type: 'timestamp' })
  take_date: Timestamp;

  @Column({ nullable: true, type: 'timestamp' })
  returned_date: Timestamp;

  @Column({ nullable: true })
  condition: string;

  @Column()
  communication: string;
}
