const assert = require("assert");
const BWT = require("../../src").BWT
describe("BWT tests", () =>{

    const st1 = "candy" , st2 = "banana"
    const bwt1 = "yc$nad", bwt2 = "annb$aa"
    const inv1 = `${st1}$`, inv2 = `${st2}$`
    it("should find the correct BWT", () =>{
        const res1 = BWT.transform(st1)
        const res2 = BWT.transform(st2)

        assert.deepStrictEqual(res1, bwt1);
        assert.deepStrictEqual(res2, bwt2);
    })

    it("should find the correct iBWT", () =>{
        const res1 = BWT.inverse_transform(bwt1)
        const res2 = BWT.inverse_transform(bwt2)

        assert.deepStrictEqual(res1,inv1);
        assert.deepStrictEqual(res2,inv2);
    })
})
