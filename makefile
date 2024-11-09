# 默认目标
all: build

# 构建目标
build:
	pnpm run build

s3list:
	aws --endpoint-url https://s3.tebi.io --profile tebi s3 ls

s3sync:
	aws --endpoint-url https://s3.tebi.io --profile tebi s3 sync .vitepress/dist s3://parap.us.kg
s3mv:
	aws s3 rm s3://parap.us.kg --recursive --endpoint-url https://s3.tebi.io --profile tebi


