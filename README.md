# RETAIL ALLIANCE / 散户联盟

## 本地
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev

## Vercel
将项目推到 GitHub -> Vercel Import。
添加 DATABASE_URL、NEXT_PUBLIC_TELEGRAM_URL。
生产数据库迁移：npx prisma migrate deploy

钱包登录仅做身份验证，不要求私钥/助记词，不执行转账或代币授权。
