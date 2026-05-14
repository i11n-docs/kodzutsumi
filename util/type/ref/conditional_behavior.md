---
type: module
author_id: ebntly

layout: layouts/index.vto

title: Conditional behavior
---

This page describes the standard capabilities and behavior for conditional behavior.

## Operands

Conditional behavior is influenced by two operands, `Left` and `Right`, which represent the types being compared. The behavior is determined by the relationship between these two operands, as "Does `Left` extend `Right`?", except in cases where the behavior is influenced by the `AsInverted` setting of the `UseInverted` capability, in which case the relationship is "Does `Right` extend `Left`?".

## Capabilities

The logic types support the following capabilities that influence its behavior:

| Capability     | Default                       | Description                                                                        |
| -------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `UseUnsafe`    | `AsSafe` (***implied***)      | Determines if a `boolean` comparison result is cast to `true`.                     |
| `UseInverted`  | `AsInitial` (***implied***)   | Determines if the comparison result is inverted.                                   |
| `UseReversed`  | `AsForward` (***implied***)   | Determines if the type comparison is reversed.                                     |
| `UseUnified`   | `AsDistributed` (**default**) | Determines if the comparison are distributed over a union or the union as a whole. |
| `UseCondition` | `AsCondition` (**default**)   | Determines the results of the conditional branches.                                |

> [!NOTE]
> The **implied** default means that if the capability is not explicitly set, it will be treated as the implied value.
> For example, if `UseUnsafe` is not set, it will be treated as `AsSafe`.
> The **default** means that if no capability is set, it will be treated as the default value and if not explicitly set, it will be treated as the implied value.

## Behavior

The behavior of conditional types is influenced by the capabilities set, which determine how the types are compared, how the comparison result is treated, and how the conditional branches are determined.

### Comparison

The `UseUnified` and `UseReversed` capabilities influence how the types are compared, either as a whole or distributed over a union, and whether the comparison is reversed. For this example let's compare `string` and `string | number`:

- With `UseUnified` as `AsDistributed` and `UseReversed` as `AsForward`, the comparison is "Does `string` extend `string | number`?", which results in `true`.
- With `UseUnified` as `AsDistributed` and `UseReversed` as `AsReversed`, the comparison is "Does `string | number` extend `string`?", which results in `false`.
- With `UseUnified` as `AsUnified` and `UseReversed` as `AsForward`, the comparison is "Does `[string]` extend `[string | number]`?", which results in `false`.
- With `UseUnified` as `AsUnified` and `UseReversed` as `AsReversed`, the comparison is "Does `[string | number]` extend `[string]`?", which results in `false`.

### Comparison result

The `UseUnsafe` and `UseInverted` capabilities influence how the comparison result is treated, either as a `boolean` or as a type, and whether the result is inverted.

There are cases where the comparison result is not explicitly `true` or `false`, resulting in a `boolean` result type. By default, the `boolean` result is treated as `false` (safe), as only cases where the comparison result is explicitly `true` are considered `true`. However, when `UseUnsafe` is set to `AsUnsafe`, the `boolean` result is treated as `true`, as it allows for the possibility of the comparison being `true` even if it cannot be determined at compile time. 

When `UseInverted` is set to `AsInverted`, the comparison result is inverted, meaning that `true` becomes `false` and `false` becomes `true`. This can be useful in cases where you want to check for the opposite condition.

### Conditional branches

The `UseCondition` capability determines the results of the conditional branches. When set to `AsCondition`, the result of the comparison is used to determine which branch of a conditional type is taken. For example, in a type like `ConditionOf<ThenType, ElseType>`, if the comparison result is `true`, the type resolves to `ThenType`, and if the comparison result is `false`, it resolves to `ElseType`. 

### Behavior matrix

The behavior matrix outlines the outcomes based on different combinations of operand results and capability settings.

| ID  | `UseCondition`                    | `UseUnified`        | `UseReversed`     | `UseInverted`     | `UseUnsafe`    | Result |
| --- | --------------------------------- | ------------------- | ----------------- | ----------------- | -------------- | ------ |
| 1   | **`AsCondition`**                 | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 2   | **`AsCondition`**                 | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 3   | **`AsCondition`**                 | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 4   | **`AsCondition`**                 | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 5   | **`AsCondition`**                 | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 6   | **`AsCondition`**                 | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 7   | **`AsCondition`**                 | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 8   | **`AsCondition`**                 | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 9   | **`AsCondition`**                 | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 10  | **`AsCondition`**                 | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 11  | **`AsCondition`**                 | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 12  | **`AsCondition`**                 | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 13  | **`AsCondition`**                 | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 14  | **`AsCondition`**                 | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 15  | **`AsCondition`**                 | `AsUnified`         | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 16  | **`AsCondition`**                 | `AsUnified`         | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 17  | **`AsCondition`**                 | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 18  | **`AsCondition`**                 | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 19  | **`AsCondition`**                 | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 20  | **`AsCondition`**                 | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 21  | **`AsCondition`**                 | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 22  | **`AsCondition`**                 | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 23  | **`AsCondition`**                 | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 24  | **`AsCondition`**                 | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 25  | **`AsCondition`**                 | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 26  | **`AsCondition`**                 | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 27  | **`AsCondition`**                 | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 28  | **`AsCondition`**                 | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 29  | **`AsCondition`**                 | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 30  | **`AsCondition`**                 | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 31  | **`AsCondition`**                 | `AsUnified`         | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 32  | **`AsCondition`**                 | `AsUnified`         | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 33  | `Then<ThenType>`                  | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 34  | `Then<ThenType>`                  | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 35  | `Then<ThenType>`                  | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 36  | `Then<ThenType>`                  | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 37  | `Then<ThenType>`                  | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 38  | `Then<ThenType>`                  | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 39  | `Then<ThenType>`                  | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 40  | `Then<ThenType>`                  | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 41  | `Then<ThenType>`                  | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 42  | `Then<ThenType>`                  | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 43  | `Then<ThenType>`                  | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 44  | `Then<ThenType>`                  | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 45  | `Then<ThenType>`                  | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 46  | `Then<ThenType>`                  | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 47  | `Then<ThenType>`                  | `AsUnified`         | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 48  | `Then<ThenType>`                  | `AsUnified`         | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 49  | `Then<ThenType>`                  | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 50  | `Then<ThenType>`                  | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 51  | `Then<ThenType>`                  | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 52  | `Then<ThenType>`                  | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 53  | `Then<ThenType>`                  | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 54  | `Then<ThenType>`                  | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 55  | `Then<ThenType>`                  | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 56  | `Then<ThenType>`                  | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 57  | `Then<ThenType>`                  | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 58  | `Then<ThenType>`                  | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 59  | `Then<ThenType>`                  | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 60  | `Then<ThenType>`                  | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 61  | `Then<ThenType>`                  | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 62  | `Then<ThenType>`                  | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 63  | `Then<ThenType>`                  | `AsUnified`         | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 64  | `Then<ThenType>`                  | `AsUnified`         | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 65  | `Else<ElseType>`                  | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 66  | `Else<ElseType>`                  | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 67  | `Else<ElseType>`                  | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 68  | `Else<ElseType>`                  | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 69  | `Else<ElseType>`                  | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 70  | `Else<ElseType>`                  | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 71  | `Else<ElseType>`                  | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 72  | `Else<ElseType>`                  | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 73  | `Else<ElseType>`                  | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 74  | `Else<ElseType>`                  | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 75  | `Else<ElseType>`                  | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 76  | `Else<ElseType>`                  | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 77  | `Else<ElseType>`                  | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 78  | `Else<ElseType>`                  | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 79  | `Else<ElseType>`                  | `AsUnified`         | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 80  | `Else<ElseType>`                  | `AsUnified`         | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 81  | `Else<ElseType>`                  | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 82  | `Else<ElseType>`                  | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 83  | `Else<ElseType>`                  | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 84  | `Else<ElseType>`                  | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 85  | `Else<ElseType>`                  | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 86  | `Else<ElseType>`                  | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 87  | `Else<ElseType>`                  | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 88  | `Else<ElseType>`                  | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 89  | `Else<ElseType>`                  | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 90  | `Else<ElseType>`                  | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 91  | `Else<ElseType>`                  | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 92  | `Else<ElseType>`                  | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 93  | `Else<ElseType>`                  | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 94  | `Else<ElseType>`                  | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 95  | `Else<ElseType>`                  | `AsUnified`         | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 96  | `Else<ElseType>`                  | `AsUnified`         | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 97  | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 98  | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 99  | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 100 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 101 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 102 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 103 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 104 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 105 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 106 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 107 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 108 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 109 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 110 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 111 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 112 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 113 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 114 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 115 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 116 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 117 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 118 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 119 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 120 | `ConditionOf<ThenType, ElseType>` | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 121 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 122 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 123 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 124 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 125 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 126 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 127 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 128 | `ConditionOf<ThenType, ElseType>` | `AsUnified`         | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
