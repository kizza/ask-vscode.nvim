/*
import {
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine
} from "./file1";
import {
  foo,
  bar,
  ridiculouslyLongFunctionCausingTheImportToWrap
} from "./file2";

const fakeFunction = s => console.log(s);
fake_Function("temp");

console.log(one, two, three, four, six, seven, eight, nine, ten);
console.log(foo, bar);
*/

//
// The content above is meant to be fixed via the test code execution below
// Simply run ":TestAskVisualStudioCode" and watch
//

import { vim } from "../vim";
import { describe, it } from "./helpers";

export const test = (plugin: any) =>
  describe("applyTextChange", async () => {
    const { applyTextChanges } = vim(plugin);

    return it("`Change spelling to 'fakeFunction'`", () =>
      applyTextChanges([
        {
          start: { line: 20, offset: 1 },
          end: { line: 20, offset: 14 },
          newText: "fakeFunction"
        }
      ]))
      .then(() =>
        it("`Infer parameter types from usage` (for s)", () =>
          applyTextChanges([
            {
              start: {
                line: 19,
                offset: 22
              },
              end: {
                line: 19,
                offset: 22
              },
              newText: "("
            },
            {
              start: {
                line: 19,
                offset: 23
              },
              end: {
                line: 19,
                offset: 23
              },
              newText: ": any"
            },
            {
              start: {
                line: 19,
                offset: 23
              },
              end: {
                line: 19,
                offset: 23
              },
              newText: ")"
            }
          ]))
      )
      .then(() =>
        it("`Remove decleration for ridiculouslyLongFunctionCausingTheImportToWrap`", () =>
          applyTextChanges([
            {
              start: {
                line: 15,
                offset: 6
              },
              end: {
                line: 16,
                offset: 3
              },
              newText: ""
            },
            {
              start: {
                line: 16,
                offset: 3
              },
              end: {
                line: 17,
                offset: 1
              },
              newText: ""
            }
          ]))
      )
      .then(() =>
        it("`Add declaration for: 'ten'`", () =>
          applyTextChanges([
            {
              start: { line: 11, offset: 7 },
              end: { line: 11, offset: 7 },
              newText: ","
            },
            {
              start: { line: 11, offset: 7 },
              end: { line: 11, offset: 7 },
              newText: "\n  ten"
            }
          ])).then(() =>
          it("`Remove declaration for: 'five'`", () =>
            applyTextChanges([
              {
                start: { line: 7, offset: 3 },
                end: { line: 8, offset: 3 },
                newText: ""
              }
            ])).then(() => {})
        )
      );
  });
