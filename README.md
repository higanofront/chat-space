# README

## usersテーブル(登録した人の情報を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :posts
- has_many :group,  
- has_many :groups  thorough:  group_users table


## postsテーブル(投稿を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|title|text|null: false|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group-name|text|null: false|
|chatmember|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :user  
- has_many :groups  thorough:  group_users table


## group_users table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false, foreign_key: true|
|id|integer|null: false, foreign_key: true|
### Association
- has_many :user  
- has_many :group   
