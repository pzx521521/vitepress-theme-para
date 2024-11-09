# 默认目标
all: build

# 构建目标
build:
	pnpm run build

s3sync:
	aws s3 sync ./.vitepress/dist s3://param.us.kg --endpoint-url https://s3.tebi.io --profile tebi
s3mv:
	aws s3 rm s3://param.us.kg --recursive --endpoint-url https://s3.tebi.io --profile tebi



