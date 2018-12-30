# Reference files for testing

I looked at automating [PDF snapshot testing](https://spin.atomicobject.com/2018/02/07/pdf-snapshot-testing-node/), but ran into issues (such as [jsdom not supporting createObjectURL](https://github.com/jsdom/jsdom/issues/1721)). For now I'm testing PDF generation manually.

1. Run the application
2. Open Redux DevTools
3. Load state_1.json
4. Click Download PDF
5. Compare the resulting file to character_1.pdf

[Beyond Compare](https://www.scootersoftware.com/) (which I love) works well for checking the text elements, and [Draftable Online Compare](https://draftable.com/compare) seems to do a good job of checking the entire PDF. I usually do a visual comparison and check Tools/Show Inspector in Preview (Mac) to see the page size.

If the state schema or the PDF layout change, we'll need to regenerate these reference files.
