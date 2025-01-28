package main

import (
	"fmt"
	"strings"
)

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

	// last character
	lc := rune(pattern[len(pattern)-1])
	lenP := len(pattern)
	ans := []int{}
	min_offset := 0

	// fmt.Println(txtIndices[lc])

	for _, lc_idx := range txtIndices[lc] {
		off := 0

		if lc_idx < min_offset || lc_idx < lenP-1 {
			continue
		}

		for ; txt[lc_idx-off] == pattern[lenP-1-off] && off < lenP-1; off++ {
		}

		if off == lenP-1 && txt[lc_idx-off] == pattern[0] {
			ans = append(ans, lc_idx-(lenP-1))
			min_offset = 0
			continue
		}

		if off > lenP-1 {
			mismatch, exists := pattIndices[rune(txt[lc_idx-off])]
			mismatch_idx := len(mismatch)
			if exists {
				for ; lenP-1-off < mismatch[mismatch_idx]; mismatch_idx-- {
				}
				min_offset = mismatch[mismatch_idx]
			} else {
				min_offset = lenP
			}

			min_offset += lc_idx
		}

	}

	fmt.Println(ans)

	return ans
}

func main() {
	txtRuneIndices := make(runeIndices)
	pattRuneIndices := make(runeIndices)

	randomString := "fainfivwbafovuiwsaov"

	loweredRandomString := strings.ToLower(randomString)
	// pattern := "dot"
	// pattern := "lmao"

	var pattern string

	for i := 'a'; i <= 'z'; i++ {
		txtRuneIndices[i] = []int{}
		pattRuneIndices[i] = []int{}
	}

	indexString(loweredRandomString, txtRuneIndices)

	for true {
		fmt.Scan(&pattern)
		indexString(strings.ToLower(pattern), pattRuneIndices)
		findPattern(txtRuneIndices, pattRuneIndices, strings.ToLower(randomString), strings.ToLower(pattern))
	}

}
