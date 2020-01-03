# README

## usersテーブル(登録した人の情報を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|email|string|null: false||unique:true;|
|password|string|null: false|
|username|string|null: false|

### Association
- has_many :posts
- has_many :groups
- has_many :group_users table  thorough:  group_users table


## postsテーブル(投稿を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|image|null: false|
|body|text||
|user_id|integer|null: false,|
### Association
- belongs_to :users
- has_many :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|chatmember|integer|null: false, |
|group_id|integer|null: false, |
### Association
- has_many :users  
- has_many :group_users table  thorough:  group_users table
- has_many :posts



## group_users table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false, |
### Association
- belongs_to :users
- belongs_to :groups