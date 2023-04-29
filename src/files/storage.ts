import { diskStorage } from 'multer';

const generateId = () => {
  return Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
};

const normalizedFileName = (_, file, cb) => {
  const fileExtName = file.originalname.split('.').pop();

  cb(null, `${generateId()}.${fileExtName}`);
};

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizedFileName,
});
