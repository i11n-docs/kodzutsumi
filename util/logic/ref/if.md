---
layout: layouts/doc.vto
title: If reference
sidebar_title: If
icon: reference
author_id: ebntly
versions:
  start: v0.0
---

# Logic matrix

| Operand | Result |
|---------|--------|
| `true` | `true` |
| `false` | `false` |
| `boolean` | `true` \| `boolean` |

> [!NOTE]
> The `boolean` result is dependent on the ElseType setting of the `UseUnsafe` capability.

# Capabilities
| Capability | Default | Description |
|------------|---------|-------------|
| `UseUnsafe` | `AsSafe` (implied) | Determines if unsafe operations are allowed. |
| `UseInverted` | `AsInitial` (implied) | Determines if inverted logic is allowed. |
| `UseCondition` | `AsCondition` (default) | Determines if conditional logic is allowed. |

## Behavior matrix
| ID | Operand Result |  `UseCondition` | `UseInverted` | `UseUnsafe` | Result |
|-|---------|--------------|---------------|----------------|--------|
| 1 | `true` | `AsCondition` | `AsSafe` | `AsInitial` | `true` |
| 2 | `true` | `AsCondition` | `AsSafe` | `AsInverted` | `false` |
| 3 | `true` | `AsCondition` | `AsUnsafe` | `AsInitial` | `true` |
| 4 | `true` | `AsCondition` | `AsUnsafe` | `AsInverted` | `false` |
| 5 | `true` | `Then<ThenType>` | `AsSafe` | `AsInitial` | `ThenType` |
| 6 | `true` | `Then<ThenType>` | `AsSafe` | `AsInverted` | `false` |
| 7 | `true` | `Then<ThenType>` | `AsUnsafe` | `AsInitial` | `ThenType` |
| 8 | `true` | `Then<ThenType>` | `AsUnsafe` | `AsInverted` | `false` |
| 9 | `true` | `Else<ElseType>` | `AsSafe` | `AsInitial` | `true` |
| 10 | `true` | `Else<ElseType>` | `AsSafe` | `AsInverted` | `ElseType` |
| 11 | `true` | `Else<ElseType>` | `AsUnsafe` | `AsInitial` | `true` |
| 12 | `true` | `Else<ElseType>` | `AsUnsafe` | `AsInverted` | `ElseType` |
| 13 | `true` | `ConditionOf<ThenType, ElseType>` | `AsSafe` | `AsInitial` | `ThenType` |
| 14 | `true` | `ConditionOf<ThenType, ElseType>` | `AsSafe` | `AsInverted` | `ElseType` |
| 15 | `true` | `ConditionOf<ThenType, ElseType>` | `AsUnsafe` | `AsInitial` | `ThenType` |
| 16 | `true` | `ConditionOf<ThenType, ElseType>` | `AsUnsafe` | `AsInverted` | `ElseType` |
| 17 | `false` | `AsCondition` | `AsSafe` | `AsInitial` | `false` |
| 18 | `false` | `AsCondition` | `AsSafe` | `AsInverted` | `true` |
| 19 | `false` | `AsCondition` | `AsUnsafe` | `AsInitial` | `false` |
| 20 | `false` | `AsCondition` | `AsUnsafe` | `AsInverted` | `true` |
| 21 | `false` | `Then<ThenType>` | `AsSafe` | `AsInitial` | `false` |
| 22 | `false` | `Then<ThenType>` | `AsSafe` | `AsInverted` | `ThenType` |
| 23 | `false` | `Then<ThenType>` | `AsUnsafe` | `AsInitial` | `false` |
| 24 | `false` | `Then<ThenType>` | `AsUnsafe` | `AsInverted` | `ThenType` |
| 25 | `false` | `Else<ElseType>` | `AsSafe` | `AsInitial` | `ElseType` |
| 26 | `false` | `Else<ElseType>` | `AsSafe` | `AsInverted` | `true` |
| 27 | `false` | `Else<ElseType>` | `AsUnsafe` | `AsInitial` | `ElseType` |
| 28 | `false` | `Else<ElseType>` | `AsUnsafe` | `AsInverted` | `true` |
| 29 | `false` | `ConditionOf<ThenType, ElseType>` | `AsSafe` | `AsInitial` | `ElseType` |
| 30 | `false` | `ConditionOf<ThenType, ElseType>` | `AsSafe` | `AsInverted` | `ThenType` |
| 31 | `false` | `ConditionOf<ThenType, ElseType>` | `AsUnsafe` | `AsInitial` | `ElseType` |
| 32 | `false` | `ConditionOf<ThenType, ElseType>` | `AsUnsafe` | `AsInverted` | `ThenType` |
| 33 | `boolean` | `AsCondition` | `AsSafe` | `AsInitial` | `boolean` |
| 34 | `boolean` | `AsCondition` | `AsSafe` | `AsInverted` | `boolean` |
| 35 | `boolean` | `AsCondition` | `AsUnsafe` | `AsInitial` | `true` |
| 36 | `boolean` | `AsCondition` | `AsUnsafe` | `AsInverted` | `false` |
| 37 | `boolean` | `Then<ThenType>` | `AsSafe` | `AsInitial` | `ThenType \| false` |
| 38 | `boolean` | `Then<ThenType>` | `AsSafe` | `AsInverted` | `false` |
| 39 | `boolean` | `Then<ThenType>` | `AsUnsafe` | `AsInitial` | `ThenType` |
| 40 | `boolean` | `Then<ThenType>` | `AsUnsafe` | `AsInverted` | `false` |
| 41 | `boolean` | `Else<ElseType>` | `AsSafe` | `AsInitial` | `true \| ElseType` |
| 42 | `boolean` | `Else<ElseType>` | `AsSafe` | `AsInverted` | `true \| ElseType` |
| 43 | `boolean` | `Else<ElseType>` | `AsUnsafe` | `AsInitial` | `true` |
| 44 | `boolean` | `Else<ElseType>` | `AsUnsafe` | `AsInverted` | `ElseType` |
| 45 | `boolean` | `ConditionOf<ThenType, ElseType>` | `AsSafe` | `AsInitial` | `ThenType \| ElseType` |
| 46 | `boolean` | `ConditionOf<ThenType, ElseType>` | `AsSafe` | `AsInverted` | `ThenType \| ElseType` |
| 47 | `boolean` | `ConditionOf<ThenType, ElseType>` | `AsUnsafe` | `AsInitial` | `ThenType` |
| 48 | `boolean` | `ConditionOf<ThenType, ElseType>` | `AsUnsafe` | `AsInverted` | `ElseType` |

> [!NOTE]
> The IDs refer to the test case validating the result.
> See [if.test.ts][if-test-file] for details.

[if-test-file]: https://github.com/kodzutsumi/kz/blob/main/kz/util/logic/types/if.test.ts
