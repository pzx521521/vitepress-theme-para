---
title: "wg导致的提前返回"
hidemeta: true
---
# wg的坑, 提前返回值
#### 逻辑描述: 

给定一个int数组, 返回一个map, 该map包含该数组及对该数组数字的处理

#### 看一下有问题的代码:

```
func sq_map2() map[int]int {
	nums := []int{1, 2, 3, 4, 5}
	out := make(chan Sq_Record)
	m := make(map[int]int)
	var wg sync.WaitGroup
	wg.Add(len(nums))
	for _, i := range nums {
		go func(n int) {
			out <- Sq_Record{n, n * n}
			wg.Done()
		}(i)
	}
	go func() {
		for record := range out {
			m[record.num] = record.sq
		}
	}()
	wg.Wait()
	close(out)
	return m
}

func main() {
	for i := 0; i < 1000; i++ {
		out2 := sq_map2()
		time.Sleep(time.Millisecond)
		fmt.Printf("%v\n", len(out2))
	}
}
```
1000次测试中, map的长度, 大概有一半的情况下会出现为4

#### 原因:

`m := make(map[int]int)` 因为只有一个线程在操作它, 所以是不存在原子性问题的
m的长度出现4原因是: **提前返回**

在返回m的时候 go func()还在往m里面添加数据, 该gorutine还没有结束的时候, 就去访问m的长度.
导致最后一个map元素在访问长度的时候还没有添加上
验证该原因:  如果改一下测试代码, 结果则全部是5

```
func main() {
	for i := 0; i < 1000; i++ {
		out2 := sq_map2()
		time.Sleep(time.Millisecond)
		fmt.Printf("%v\n", len(out2))
	}
}
```
正确的写法是:
```
func sq_map() map[int]int {
	nums := []int{1, 2, 3, 4, 5}
	out := make(chan Sq_Record)
	m := make(map[int]int)
	var wg sync.WaitGroup
	wg.Add(len(nums))
	for _, i := range nums {
		go func(n int) {
			out <- Sq_Record{n, n * n}
			wg.Done()
		}(i)
	}
	go func() {
		wg.Wait()
		close(out)
	}()
	for record := range out {
		m[record.num] = record.sq
	}
	return m
}
```
这样是不会提前返回的

