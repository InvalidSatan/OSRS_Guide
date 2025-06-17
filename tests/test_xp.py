import xp


def test_xp_for_level_basic():
    assert xp.xp_for_level(1) == 0
    assert xp.xp_for_level(2) == 83
    assert xp.xp_for_level(99) == 13034431


def test_level_for_xp_basic():
    assert xp.level_for_xp(0) == 1
    assert xp.level_for_xp(83) == 2
    assert xp.level_for_xp(13034431 - 1) == 98
