/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Fs = require('fs');

// Parser from template AST
const ModelLoader = require('@accordproject/concerto-core').ModelLoader;
const TemplateMarkTransformer = require('../lib/TemplateMarkTransformer');

const loadFile = (x) => { return { fileName: x, content: Fs.readFileSync(x, 'utf8') }; };

const grammar1 = loadFile('./test/data/template1/grammar1.tem.md');
const model1 = './test/data/template1/model1.cto';
const sample1 = loadFile('./test/data/template1/sample1.md');
const sample1Err1 = loadFile('./test/data/template1/sample1Err1.md');
const sample1Err2 = loadFile('./test/data/template1/sample1Err2.md');
const sample1Err3 = loadFile('./test/data/template1/sample1Err3.md');

const grammarErr1 = loadFile('./test/data/templateErr1/grammarErr1.tem.md');
const modelErr1 = './test/data/templateErr1/modelErr1.cto';
const sampleErr1 = loadFile('./test/data/templateErr1/sampleErr1.md');

const grammarErr2 = loadFile('./test/data/templateErr2/grammarErr2.tem.md');
const modelErr2 = './test/data/templateErr2/modelErr2.cto';
const sampleErr2 = loadFile('./test/data/templateErr2/sampleErr2.md');

const grammarErr3 = loadFile('./test/data/templateErr3/grammarErr3.tem.md');
const modelErr3 = './test/data/templateErr3/modelErr3.cto';
const sampleErr3 = loadFile('./test/data/templateErr3/sampleErr3.md');

const grammarErr4 = loadFile('./test/data/templateErr4/grammarErr4.tem.md');
const modelErr4 = './test/data/templateErr4/modelErr4.cto';
const sampleErr4 = loadFile('./test/data/templateErr4/sampleErr4.md');

const grammarErr5 = loadFile('./test/data/templateErr5/grammarErr5.tem.md');
const modelErr5 = './test/data/templateErr5/modelErr5.cto';
const sampleErr5 = loadFile('./test/data/templateErr5/sampleErr5.md');

const grammarErr6 = loadFile('./test/data/templateErr6/grammarErr6.tem.md');
const modelErr6 = './test/data/templateErr6/modelErr6.cto';
const sampleErr6 = loadFile('./test/data/templateErr6/sampleErr6.md');

const grammar2 = loadFile('./test/data/template2/grammar2.tem.md');
const model2 = './test/data/template2/model2.cto';
const sample2 = loadFile('./test/data/template2/sample2.md');
const sample2Err1 = loadFile('./test/data/template2/sample2Err1.md');
const sample2Err2 = loadFile('./test/data/template2/sample2Err2.md');
const sample2Err3 = loadFile('./test/data/template2/sample2Err3.md');
const sample2Err4 = loadFile('./test/data/template2/sample2Err4.md');

const grammarLarge = loadFile('./test/data/templateLarge/grammarLarge.tem.md');
const modelLarge = './test/data/templateLarge/modelLarge.cto';
const sampleLarge = loadFile('./test/data/templateLarge/sampleLarge.md');

const grammarDateTime = loadFile('./test/data/templateDateTime/grammarDateTime.tem.md');
const modelDateTime = './test/data/templateDateTime/modelDateTime.cto';
const sampleDateTime = loadFile('./test/data/templateDateTime/sampleDateTime.md');

const grammarUList = loadFile('./test/data/templateUList/grammarUList.tem.md');
const modelUList = './test/data/templateUList/modelUList.cto';
const sampleUList = loadFile('./test/data/templateUList/sampleUList.md');

const grammarOList = loadFile('./test/data/templateOList/grammarOList.tem.md');
const modelOList = './test/data/templateOList/modelOList.cto';
const sampleOList = loadFile('./test/data/templateOList/sampleOList.md');
const sampleOList2 = loadFile('./test/data/templateOList/sampleOList2.md');

const grammarRepeat = loadFile('./test/data/templateRepeat/grammarRepeat.tem.md');
const modelRepeat = './test/data/templateRepeat/modelRepeat.cto';
const sampleRepeat = loadFile('./test/data/templateRepeat/sampleRepeat.md');
const sampleRepeatErr = loadFile('./test/data/templateRepeat/sampleRepeatErr.md');

const grammarWith = loadFile('./test/data/templateWith/grammarWith.tem.md');
const modelWith = './test/data/templateWith/modelWith.cto';
const sampleWith = loadFile('./test/data/templateWith/sampleWith.md');

const grammarComputed = loadFile('./test/data/templateComputed/grammarComputed.tem.md');
const modelComputed = './test/data/templateComputed/modelComputed.cto';
const sampleComputed = loadFile('./test/data/templateComputed/sampleComputed.md');
const sampleComputedErr = loadFile('./test/data/templateComputed/sampleComputedErr.md');

const grammarMd1 = loadFile('./test/data/templateMd1/grammarMd1.tem.md');
const grammarMd1Json = JSON.parse(loadFile('./test/data/templateMd1/grammarMd1.json').content);
const modelMd1 = './test/data/templateMd1/modelMd1.cto';
//const sampleMd1 = loadFile('./test/data/templateMd1/sampleMd1.md');

const grammarMd2 = loadFile('./test/data/templateMd2/grammarMd2.tem.md');
const grammarMd2Json = JSON.parse(loadFile('./test/data/templateMd2/grammarMd2.json').content);
const modelMd2 = './test/data/templateMd2/modelMd2.cto';
//const sampleMd2 = loadFile('./test/data/templateMd2/sampleMd2.md');

// Tests
describe('#invalidTemplates', () => {
    describe('#templateErr1', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelErr1]);
        });

        it('should fail loading template (duplicate clause)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleErr1,grammarErr1,modelManager,'clause')).should.throw('Found multiple instances of org.accordproject.cicero.contract.AccordClause. The model for the template must contain a single asset that extends org.accordproject.cicero.contract.AccordClause.');
        });

        it('should fail loading template (duplicate contract)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleErr1,grammarErr1,modelManager,'contract')).should.throw('Found multiple instances of org.accordproject.cicero.contract.AccordContract. The model for the template must contain a single asset that extends org.accordproject.cicero.contract.AccordContract.');
        });
    });

    describe('#templateErr2', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelErr2]);
        });

        it('should fail loading template (duplicate clause)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleErr2,grammarErr2,modelManager,'clause')).should.throw('Failed to find an asset that extends org.accordproject.cicero.contract.AccordClause. The model for the template must contain a single asset that extends org.accordproject.cicero.contract.AccordClause.');
        });

        it('should fail loading template (duplicate contract)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleErr2,grammarErr2,modelManager,'contract')).should.throw('Failed to find an asset that extends org.accordproject.cicero.contract.AccordContract. The model for the template must contain a single asset that extends org.accordproject.cicero.contract.AccordContract.');
        });
    });

    describe('#templateErr3', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelErr3]);
        });

        it('should fail loading template (missing clause property)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleErr3,grammarErr3,modelManager,'clause')).should.throw('Unknown property seller');
        });
    });

    describe('#templateErr4', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelErr4]);
        });

        it('should fail loading template (missing contract property)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleErr4,grammarErr4,modelManager,'contract')).should.throw('Unknown property agreement');
        });
    });

    describe('#templateErr5', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelErr5]);
        });

        it('should fail loading template (missing with property)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleErr5,grammarErr5,modelManager,'contract')).should.throw('Unknown property sellerAddress');
        });
    });

    describe('#templateErr6', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelErr6]);
        });

        it('should fail loading template (missing list property)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleErr6,grammarErr6,modelManager,'contract')).should.throw('Unknown property prices');
        });
    });
});

describe('#parse', () => {
    describe('#template1', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[model1]);
        });

        it('should parse', async () => {
            (new TemplateMarkTransformer()).parse(sample1,grammar1,modelManager,'clause').amount.should.equal(3131);
        });

        it('should parse (verbose)', async () => {
            (new TemplateMarkTransformer()).parse(sample1,grammar1,modelManager,'clause',{verbose:true}).amount.should.equal(3131);
        });
    });

    describe('#template1 (error)', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[model1]);
        });

        it('should fail parsing (wrong currency code)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sample1Err1,grammar1,modelManager,'clause')).should.throw('Parse error at line 1 column 74\nThis is a contract between "Steve" and "Betty" for the amount of 3131.00 GRR, even in the presence of force majeure.');
        });

        it('should fail parsing (wrong string)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sample1Err2,grammar1,modelManager,'clause')).should.throw('Parse error at line 1 column 28\nThis is a contract between Steve" and "Betty" for the amount of 3131.00 EUR, even in the presence of force majeure.');
        });

        it('should fail parsing (wrong double)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sample1Err3,grammar1,modelManager,'clause')).should.throw('Parse error at line 1 column 66\nThis is a contract between "Steve" and "Betty" for the amount of .00 EUR, even in the presence of force majeure.');
        });
    });

    describe('#template2', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[model2]);
        });

        it('should parse', async () => {
            (new TemplateMarkTransformer()).parse(sample2,grammar2,modelManager,'contract').penalty.should.equal(10);
        });
    });

    describe('#template2 (error)', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[model2]);
        });

        it('should fail parsing (extra text)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sample2Err1,grammar2,modelManager,'contract')).should.throw('Parse error at line 7 column 46\nThere is a penalty of 10% for non compliance.X\n                                             ^\nExpected: End of text');
        });
        it('should fail parsing (wrong text)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sample2Err2,grammar2,modelManager,'contract')).should.throw('Parse error at line 4 column 77\nThis is a contract between "Steve" and "Betty" for the amount of 3131.00 EUR, even in the presence of forcemajeure.');
        });
        it('should fail parsing (wrong text)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sample2Err3,grammar2,modelManager,'contract')).should.throw('Parse error at line 3 column 118\n``` <clause src="ap://acceptance-of-delivery@0.12.1#721d1aa0999a5d278653e211ae2a64b75fdd8ca6fa1f34255533c942404c5c1f" claused="479adbb4-dc55-4d1a-ab12-b6c5e16900c0">\n                                                                                                                     ^^^^^^^^^^\nExpected: \' clauseid=\'');
        });
        it('should fail parsing (wrong text)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sample2Err4,grammar2,modelManager,'contract')).should.throw('Parse error at line 7 column 23\nThere is a penalty of .10% for non compliance.\n                      ^^^^^^^^^^^^^^^^^^\nExpected: An Integer literal');
        });
    });

    describe('#templateLarge', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelLarge]);
        });

        it('should parse', async () => {
            (new TemplateMarkTransformer()).parse(sampleLarge,grammarLarge,modelManager,'contract').penalty.should.equal(10.99);
        });
    });

    describe('#templateDateTime', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelDateTime]);
        });

        it('should parse', async () => {
            (new TemplateMarkTransformer()).parse(sampleDateTime,grammarDateTime,modelManager,'clause').effectiveDate.should.equal('2020-01-01T00:00:00.000Z');
        });
    });

    describe.skip('#templateUList', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelUList]);
        });

        it('should parse', async () => {
            const result = (new TemplateMarkTransformer()).parse(sampleUList,grammarUList,modelManager,'contract');
            result.prices.length.should.equal(3);
            result.prices[0].$class.should.equal('org.test.Price');
            result.prices[0].number.should.equal(1);
            result.prices[1].$class.should.equal('org.test.Price');
            result.prices[1].number.should.equal(2);
            result.prices[2].$class.should.equal('org.test.Price');
            result.prices[2].number.should.equal(3);
        });
    });

    describe.skip('#templateOList', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelOList]);
        });

        it('should parse (same number)', async () => {
            const result = (new TemplateMarkTransformer()).parse(sampleOList,grammarOList,modelManager,'contract');
            result.prices.length.should.equal(3);
            result.prices[0].$class.should.equal('org.test.Price');
            result.prices[0].number.should.equal(1);
            result.prices[1].$class.should.equal('org.test.Price');
            result.prices[1].number.should.equal(2);
            result.prices[2].$class.should.equal('org.test.Price');
            result.prices[2].number.should.equal(3);
        });

        it('should parse (same various numbers)', async () => {
            const result = (new TemplateMarkTransformer()).parse(sampleOList2,grammarOList,modelManager,'contract');
            result.prices.length.should.equal(4);
            result.prices[0].$class.should.equal('org.test.Price');
            result.prices[0].number.should.equal(1);
            result.prices[1].$class.should.equal('org.test.Price');
            result.prices[1].number.should.equal(2);
            result.prices[2].$class.should.equal('org.test.Price');
            result.prices[2].number.should.equal(3);
            result.prices[3].$class.should.equal('org.test.Price');
            result.prices[3].number.should.equal(4);
        });
    });

    describe.skip('#templateRepeat', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelRepeat]);
        });

        it('should parse', async () => {
            const result = (new TemplateMarkTransformer()).parse(sampleRepeat,grammarRepeat,modelManager,'clause');
            result.seller.should.equal('Steve');
            result.buyer.should.equal('Betty');
        });
    });

    describe.skip('#templateRepeat (error)', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelRepeat]);
        });

        it('should fail parsing (inconsistent variables)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleRepeatErr,grammarRepeat,modelManager,'clause')).should.throw('Inconsistent values for variable seller: Steve and Betty');
        });
    });

    describe.skip('#templateWith', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelWith]);
        });

        it('should parse', async () => {
            const result = (new TemplateMarkTransformer()).parse(sampleWith,grammarWith,modelManager,'contract');
            result.agreement.seller.should.equal('Steve');
            result.agreement.buyer.should.equal('Betty');
            result.sellerAddress.city.should.equal('NYC');
            result.buyerAddress.city.should.equal('London');
        });
    });

    describe('#templateComputed', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelComputed]);
        });

        it('should parse', async () => {
            const result = (new TemplateMarkTransformer()).parse(sampleComputed,grammarComputed,modelManager,'contract');
            result.agreement.seller.should.equal('Steve');
            result.agreement.buyer.should.equal('Betty');
        });
    });

    describe('#templateComputed (error)', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelComputed]);
        });

        it('should fail parsing (inconsistent variables)', async () => {
            (() => (new TemplateMarkTransformer()).parse(sampleComputedErr,grammarComputed,modelManager,'contract')).should.throw('Parse error at line 8 column 11\nAnd this: {something something}} is a computed value.\n          ^^^^^^^^^^^');
        });
    });

});

describe('#fromMarkdownTemplate', () => {
    describe('#templateMd1', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelMd1]);
        });

        it('should transform to TemplateMark', async () => {
            (new TemplateMarkTransformer()).fromMarkdownTemplate(grammarMd1,modelManager,'clause').should.deep.equal(grammarMd1Json);
        });

        it('should transform to TemplateMark (verbose)', async () => {
            (new TemplateMarkTransformer()).fromMarkdownTemplate(grammarMd1,modelManager,'clause',{verbose:true}).should.deep.equal(grammarMd1Json);
        });
    });

    describe('#templateMd2', () => {
        let modelManager;
        before(async () => {
            modelManager = await ModelLoader.loadModelManager(null,[modelMd2]);
        });

        it('should transform to TemplateMark', async () => {
            (new TemplateMarkTransformer()).fromMarkdownTemplate(grammarMd2,modelManager,'contract').should.deep.equal(grammarMd2Json);
        });
    });

});