# README

## usersテーブル(登録した人の情報を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|｜add_index :users, :email, unique: true｜
|password|string|null: false|
|name|string|null: false||index: true|

### Association
- has_many :posts
- has_many :groups, through: :group_users 
- has_many :group_users  


## postsテーブル(投稿を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|image||string|
|body|text||
|user|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :group_users
- has_many :group_users  
- has_many :posts



## groups_users テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false||foreign_key: true|
|group_id|references|null: false,||foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group