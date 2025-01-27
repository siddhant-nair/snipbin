package main

// import "fmt"

type runeIndices map[rune][]int

func indexString(txt string, runeCount runeIndices) runeIndices {

	for i, v := range txt {
		if _, exists := runeCount[v]; exists {
			runeCount[v] = append(runeCount[v], i)
		}
	}

	return runeIndices{}
}

// bayes-moore attempt 1
func findPattern(txtIndices runeIndices, pattIndices runeIndices, txt string, pattern string) []int {

	lastChar := rune(pattern[len(pattern)-1])
	ans := []int{}
	minOffset := 0

	for _, v := range txtIndices[lastChar] {

	}

	return ans
}

func main() {
	txtRuneIndices := make(runeIndices)
	pattRuneIndices := make(runeIndices)

	randomString := `ttY bM,qt InCwdoitC[D;O t0J b]WMv4dotpTXj0., XJtyZ
{lV6b74S} Dotxf{KLs LqnKPT6$ 9zkU{fE&H7rI ${txtIndices}
 cCwez=g9Mtb' 6eMSVL 'FM8yLX 2i(fVRdoth4)2MW`

	pattern := "dot"

	for i := 'a'; i <= 'z'; i++ {
		txtRuneIndices[i] = []int{}
		pattRuneIndices[i] = []int{}
	}

	indexString(randomString, txtRuneIndices)
	indexString(pattern, pattRuneIndices)

	findPattern(txtRuneIndices, pattRuneIndices, randomString, pattern)

}
