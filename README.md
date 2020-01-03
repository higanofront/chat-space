# README

## usersテーブル(登録した人の情報を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|｜add_index :users, :email, unique: true｜
|password|string|null: false|
|name|string|null: false||foreign_key: true|

### Association
- has_many :posts
- has_many :groups thorough:  group_users 
- has_many :group_users  


## postsテーブル(投稿を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|image||string|
|body|text||
|user_id|integer|null: false,|
### Association
- belongs_to :user
- has_many :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users  thorough:  group_users 
- has_many :group_users  
- has_many :posts



## groups_users テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false||foreign_key: true|
|group_id|integer|null: false,||foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group