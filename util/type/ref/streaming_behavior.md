---
type: module
author_id: ebntly

layout: layouts/index.vto

title: Streaming behavior
---

This page describes the standard capabilities and behavior for streaming behavior.

## Operands

Streaming behavior is influenced by two operands, `Left` and `Right`, which represent the types being compared. The behavior is determined by the relationship between these two operands, as "Does `Left` extend `Right`?", except in cases where the behavior is influenced by the `AsInverted` setting of the `UseInverted` capability, in which case the relationship is "Does `Right` extend `Left`?".

## Capabilities

The logic types support the following capabilities that influence its behavior:

| Capability       | Default                     | Description                                                                        |
| ---------------- | --------------------------- | ---------------------------------------------------------------------------------- |
| `UseUnsafe`      | `AsSafe` (***implied***)    | Determines if a `boolean` comparison result is cast to `true`.                     |
| `UseInverted`    | `AsInitial` (***implied***) | Determines if the comparison result is inverted.                                   |
| `UseStrict`      | `AsLoose` (***implied***)   | Determines if the types are strictly compared.                                     |
| `UseReversed`    | `AsForward` (***implied***) | Determines if the type comparison is reversed.                                     |
| `UseDistributed` | `AsUnion` (**default**)     | Determines if the comparison are distributed over a union or the union as a whole. |
| `UseStream`      | `AsPredicate` (**default**) | Determines if types are filtered out of a result or simply type checked.           |

> [!NOTE]
> The **implied** default means that if the capability is not explicitly set, it will be treated as the implied value.
> For example, if `UseUnsafe` is not set, it will be treated as `AsSafe`.
> The **default** means that if no capability is set, it will be treated as the default value and if not explicitly set, it will be treated as the implied value.

## Behavior matrix

The behavior matrix outlines the outcomes based on different combinations of operand results and capability settings.

| ID  | `UseStream`       | `UseDistributed` | `UseReversed`     | `UseInverted`     | `UseStrict`     | `UseUnsafe`    | Result |
| --- | ----------------- | ---------------- | ----------------- | ----------------- | --------------- | -------------- | ------ |
| 1   | **`AsPredicate`** | **`AsUnion`**    | ***`AsForward`*** | ***`AsInitial`*** | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 2   | **`AsPredicate`** | **`AsUnion`**    | ***`AsForward`*** | ***`AsInitial`*** | ***`AsLoose`*** | `AsUnsafe`     |        |
| 3   | **`AsPredicate`** | **`AsUnion`**    | ***`AsForward`*** | ***`AsInitial`*** | `AsStrict`      | ***`AsSafe`*** |        |
| 4   | **`AsPredicate`** | **`AsUnion`**    | ***`AsForward`*** | ***`AsInitial`*** | `AsStrict`      | `AsUnsafe`     |        |
| 5   | **`AsPredicate`** | **`AsUnion`**    | ***`AsForward`*** | `AsInverted`      | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 6   | **`AsPredicate`** | **`AsUnion`**    | ***`AsForward`*** | `AsInverted`      | ***`AsLoose`*** | `AsUnsafe`     |        |
| 7   | **`AsPredicate`** | **`AsUnion`**    | ***`AsForward`*** | `AsInverted`      | `AsStrict`      | ***`AsSafe`*** |        |
| 8   | **`AsPredicate`** | **`AsUnion`**    | ***`AsForward`*** | `AsInverted`      | `AsStrict`      | `AsUnsafe`     |        |
| 9   | **`AsPredicate`** | **`AsUnion`**    | `AsReversed`      | ***`AsInitial`*** | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 10  | **`AsPredicate`** | **`AsUnion`**    | `AsReversed`      | ***`AsInitial`*** | ***`AsLoose`*** | `AsUnsafe`     |        |
| 11  | **`AsPredicate`** | **`AsUnion`**    | `AsReversed`      | ***`AsInitial`*** | `AsStrict`      | ***`AsSafe`*** |        |
| 12  | **`AsPredicate`** | **`AsUnion`**    | `AsReversed`      | ***`AsInitial`*** | `AsStrict`      | `AsUnsafe`     |        |
| 13  | **`AsPredicate`** | **`AsUnion`**    | `AsReversed`      | `AsInverted`      | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 14  | **`AsPredicate`** | **`AsUnion`**    | `AsReversed`      | `AsInverted`      | ***`AsLoose`*** | `AsUnsafe`     |        |
| 15  | **`AsPredicate`** | **`AsUnion`**    | `AsReversed`      | `AsInverted`      | `AsStrict`      | ***`AsSafe`*** |        |
| 16  | **`AsPredicate`** | **`AsUnion`**    | `AsReversed`      | `AsInverted`      | `AsStrict`      | `AsUnsafe`     |        |
| 17  | **`AsPredicate`** | `AsDistributed`  | ***`AsForward`*** | ***`AsInitial`*** | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 18  | **`AsPredicate`** | `AsDistributed`  | ***`AsForward`*** | ***`AsInitial`*** | ***`AsLoose`*** | `AsUnsafe`     |        |
| 19  | **`AsPredicate`** | `AsDistributed`  | ***`AsForward`*** | ***`AsInitial`*** | `AsStrict`      | ***`AsSafe`*** |        |
| 20  | **`AsPredicate`** | `AsDistributed`  | ***`AsForward`*** | ***`AsInitial`*** | `AsStrict`      | `AsUnsafe`     |        |
| 21  | **`AsPredicate`** | `AsDistributed`  | ***`AsForward`*** | `AsInverted`      | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 22  | **`AsPredicate`** | `AsDistributed`  | ***`AsForward`*** | `AsInverted`      | ***`AsLoose`*** | `AsUnsafe`     |        |
| 23  | **`AsPredicate`** | `AsDistributed`  | ***`AsForward`*** | `AsInverted`      | `AsStrict`      | ***`AsSafe`*** |        |
| 24  | **`AsPredicate`** | `AsDistributed`  | ***`AsForward`*** | `AsInverted`      | `AsStrict`      | `AsUnsafe`     |        |
| 25  | **`AsPredicate`** | `AsDistributed`  | `AsReversed`      | ***`AsInitial`*** | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 26  | **`AsPredicate`** | `AsDistributed`  | `AsReversed`      | ***`AsInitial`*** | ***`AsLoose`*** | `AsUnsafe`     |        |
| 27  | **`AsPredicate`** | `AsDistributed`  | `AsReversed`      | ***`AsInitial`*** | `AsStrict`      | ***`AsSafe`*** |        |
| 28  | **`AsPredicate`** | `AsDistributed`  | `AsReversed`      | ***`AsInitial`*** | `AsStrict`      | `AsUnsafe`     |        |
| 29  | **`AsPredicate`** | `AsDistributed`  | `AsReversed`      | `AsInverted`      | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 30  | **`AsPredicate`** | `AsDistributed`  | `AsReversed`      | `AsInverted`      | ***`AsLoose`*** | `AsUnsafe`     |        |
| 31  | **`AsPredicate`** | `AsDistributed`  | `AsReversed`      | `AsInverted`      | `AsStrict`      | ***`AsSafe`*** |        |
| 32  | **`AsPredicate`** | `AsDistributed`  | `AsReversed`      | `AsInverted`      | `AsStrict`      | `AsUnsafe`     |        |
| 33  | `AsFilter`        | **`AsUnion`**    | ***`AsForward`*** | ***`AsInitial`*** | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 34  | `AsFilter`        | **`AsUnion`**    | ***`AsForward`*** | ***`AsInitial`*** | ***`AsLoose`*** | `AsUnsafe`     |        |
| 35  | `AsFilter`        | **`AsUnion`**    | ***`AsForward`*** | ***`AsInitial`*** | `AsStrict`      | ***`AsSafe`*** |        |
| 36  | `AsFilter`        | **`AsUnion`**    | ***`AsForward`*** | ***`AsInitial`*** | `AsStrict`      | `AsUnsafe`     |        |
| 37  | `AsFilter`        | **`AsUnion`**    | ***`AsForward`*** | `AsInverted`      | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 38  | `AsFilter`        | **`AsUnion`**    | ***`AsForward`*** | `AsInverted`      | ***`AsLoose`*** | `AsUnsafe`     |        |
| 39  | `AsFilter`        | **`AsUnion`**    | ***`AsForward`*** | `AsInverted`      | `AsStrict`      | ***`AsSafe`*** |        |
| 40  | `AsFilter`        | **`AsUnion`**    | ***`AsForward`*** | `AsInverted`      | `AsStrict`      | `AsUnsafe`     |        |
| 41  | `AsFilter`        | **`AsUnion`**    | `AsReversed`      | ***`AsInitial`*** | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 42  | `AsFilter`        | **`AsUnion`**    | `AsReversed`      | ***`AsInitial`*** | ***`AsLoose`*** | `AsUnsafe`     |        |
| 43  | `AsFilter`        | **`AsUnion`**    | `AsReversed`      | ***`AsInitial`*** | `AsStrict`      | ***`AsSafe`*** |        |
| 44  | `AsFilter`        | **`AsUnion`**    | `AsReversed`      | ***`AsInitial`*** | `AsStrict`      | `AsUnsafe`     |        |
| 45  | `AsFilter`        | **`AsUnion`**    | `AsReversed`      | `AsInverted`      | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 46  | `AsFilter`        | **`AsUnion`**    | `AsReversed`      | `AsInverted`      | ***`AsLoose`*** | `AsUnsafe`     |        |
| 47  | `AsFilter`        | **`AsUnion`**    | `AsReversed`      | `AsInverted`      | `AsStrict`      | ***`AsSafe`*** |        |
| 48  | `AsFilter`        | **`AsUnion`**    | `AsReversed`      | `AsInverted`      | `AsStrict`      | `AsUnsafe`     |        |
| 49  | `AsFilter`        | `AsDistributed`  | ***`AsForward`*** | ***`AsInitial`*** | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 50  | `AsFilter`        | `AsDistributed`  | ***`AsForward`*** | ***`AsInitial`*** | ***`AsLoose`*** | `AsUnsafe`     |        |
| 51  | `AsFilter`        | `AsDistributed`  | ***`AsForward`*** | ***`AsInitial`*** | `AsStrict`      | ***`AsSafe`*** |        |
| 52  | `AsFilter`        | `AsDistributed`  | ***`AsForward`*** | ***`AsInitial`*** | `AsStrict`      | `AsUnsafe`     |        |
| 53  | `AsFilter`        | `AsDistributed`  | ***`AsForward`*** | `AsInverted`      | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 54  | `AsFilter`        | `AsDistributed`  | ***`AsForward`*** | `AsInverted`      | ***`AsLoose`*** | `AsUnsafe`     |        |
| 55  | `AsFilter`        | `AsDistributed`  | ***`AsForward`*** | `AsInverted`      | `AsStrict`      | ***`AsSafe`*** |        |
| 56  | `AsFilter`        | `AsDistributed`  | ***`AsForward`*** | `AsInverted`      | `AsStrict`      | `AsUnsafe`     |        |
| 57  | `AsFilter`        | `AsDistributed`  | `AsReversed`      | ***`AsInitial`*** | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 58  | `AsFilter`        | `AsDistributed`  | `AsReversed`      | ***`AsInitial`*** | ***`AsLoose`*** | `AsUnsafe`     |        |
| 59  | `AsFilter`        | `AsDistributed`  | `AsReversed`      | ***`AsInitial`*** | `AsStrict`      | ***`AsSafe`*** |        |
| 60  | `AsFilter`        | `AsDistributed`  | `AsReversed`      | ***`AsInitial`*** | `AsStrict`      | `AsUnsafe`     |        |
| 61  | `AsFilter`        | `AsDistributed`  | `AsReversed`      | `AsInverted`      | ***`AsLoose`*** | ***`AsSafe`*** |        |
| 62  | `AsFilter`        | `AsDistributed`  | `AsReversed`      | `AsInverted`      | ***`AsLoose`*** | `AsUnsafe`     |        |
| 63  | `AsFilter`        | `AsDistributed`  | `AsReversed`      | `AsInverted`      | `AsStrict`      | ***`AsSafe`*** |        |
| 64  | `AsFilter`        | `AsDistributed`  | `AsReversed`      | `AsInverted`      | `AsStrict`      | `AsUnsafe`     |        |
