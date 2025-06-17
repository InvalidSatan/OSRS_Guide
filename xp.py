def xp_for_level(level: int) -> int:
    points = 0
    for lvl in range(1, level):
        points += int(lvl + 300 * 2 ** (lvl / 7))
    return points // 4


def level_for_xp(xp: int) -> int:
    for level in range(1, 100):
        if xp_for_level(level + 1) > xp:
            return level
    return 99
