/* jshint expr:true */
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

var domain;

// Controllers
describe('It can be included', function(){

  it('can be included', function(){
    domain = require("../index");
  });

  it('accepts options', function(){
    domain({ host: "example.com" });
  });

  it('is a function', function(){
    expect(domain).to.be.a.function;
  });
});

describe('Handling the redirection', function(){

  var generate = {
    req: function(protocol, domain, url){
      return {
        get: function(){ return domain; },
        url: url,
        protocol: protocol
      };
    },
    res: function(codeExpected, urlExpected){
      return {
        redirect: function(code, url){
          expect(code).to.equal(codeExpected);
          expect(url).to.equal(urlExpected);
        }
      };
    },
    next: function(expected){
      return function(err){
        if (err) throw err;
        if(!expected) {
          throw new Error("Next shouldn't be called here");
        }
      };
    }
  };

  it('is done properly', function(){
    var fakeReq = generate.req('http', 'example.com', '');
    var fakeRes = generate.res(301, 'http://example.org');
    var fakeNext = generate.next(false);

    domain({ host: 'example.org' })(fakeReq, fakeRes, fakeNext);
  });

  it('is not done when not needed properly', function(){
    var fakeReq = generate.req('http', 'example.com', '');
    var fakeRes = generate.res(301, 'http://example.com');
    var fakeNext = generate.next(true);

    domain({ host: 'example.com' })(fakeReq, fakeRes, fakeNext);
  });
});
