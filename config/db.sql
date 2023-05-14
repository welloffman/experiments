CREATE SCHEMA `experiments` DEFAULT CHARACTER SET utf8;

CREATE TABLE experiments.question (
	id INT UNSIGNED auto_increment NOT NULL,
	question TEXT NULL,
	answer TEXT NULL,
	theme_id INT UNSIGNED NOT NULL,
	CONSTRAINT question_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE experiments.cell (
	id INT UNSIGNED auto_increment NOT NULL,
	`type` ENUM('grass', 'forest', 'sand', 'water', 'steppe') CHARACTER SET armscii8 COLLATE armscii8_general_ci NULL,
	x INT UNSIGNED NULL,
	y INT UNSIGNED NULL,
	CONSTRAINT cell_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;