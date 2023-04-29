import { Injectable } from '@nestjs/common';
import { FileEntity } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileType } from './files.controller';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity) private repository: Repository<FileEntity>,
  ) {}

  findAll(userId: number, fileType: FileType) {
    const qb = this.repository.createQueryBuilder('file');
    qb.where('file.userId = :userId', { userId });

    if (fileType === 'photos') {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }
    if (fileType === 'trash') {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }
    return qb.getMany();
  }

  create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }
}
